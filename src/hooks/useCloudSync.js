import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

// Debounce helper
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const useCloudSync = () => {
  const { getAuthHeader, isAuthenticated } = useAuth();
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, success, error
  const [lastSynced, setLastSynced] = useState(null);
  const [cloudData, setCloudData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from cloud
  const fetchFromCloud = useCallback(async () => {
    if (!isAuthenticated) return null;

    try {
      setSyncStatus('syncing');
      const response = await fetch('/api/data', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setCloudData(data);
      setSyncStatus('success');
      setLastSynced(new Date());
      return data;
    } catch (error) {
      console.error('Cloud fetch error:', error);
      setSyncStatus('error');
      return null;
    }
  }, [isAuthenticated, getAuthHeader]);

  // Save data to cloud (debounced)
  const saveToCloudImmediate = useCallback(async (data) => {
    if (!isAuthenticated) return false;

    try {
      setSyncStatus('syncing');
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeader(),
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const result = await response.json();
      if (result.success) {
        setCloudData(result.data);
        setSyncStatus('success');
        setLastSynced(new Date());
        return true;
      }
      throw new Error('Save failed');
    } catch (error) {
      console.error('Cloud save error:', error);
      setSyncStatus('error');
      return false;
    }
  }, [isAuthenticated, getAuthHeader]);

  // Create debounced version
  const debouncedSaveRef = useRef();
  useEffect(() => {
    debouncedSaveRef.current = debounce(saveToCloudImmediate, 1000);
  }, [saveToCloudImmediate]);

  const saveToCloud = useCallback((data) => {
    if (debouncedSaveRef.current) {
      debouncedSaveRef.current(data);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);
      fetchFromCloud().finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, fetchFromCloud]);

  return {
    cloudData,
    syncStatus,
    lastSynced,
    isLoading,
    fetchFromCloud,
    saveToCloud,
    saveToCloudImmediate,
  };
};

// Hook for syncing specific data keys
export const useSyncedState = (key, defaultValue, cloudSync) => {
  const { cloudData, saveToCloud, isLoading: cloudLoading } = cloudSync;

  // Initialize from localStorage first
  const [value, setValue] = useState(() => {
    const localKey = `jerri_${key}`;
    const saved = localStorage.getItem(localKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return saved; // For string values
      }
    }
    return defaultValue;
  });

  const [hasLoadedFromCloud, setHasLoadedFromCloud] = useState(false);

  // Update from cloud data when it arrives (only once)
  useEffect(() => {
    if (!cloudLoading && cloudData && !hasLoadedFromCloud) {
      if (cloudData[key] !== undefined) {
        setValue(cloudData[key]);
      }
      setHasLoadedFromCloud(true);
    }
  }, [cloudData, cloudLoading, key, hasLoadedFromCloud]);

  // Save to localStorage and cloud when value changes
  useEffect(() => {
    if (hasLoadedFromCloud) {
      const localKey = `jerri_${key}`;
      const valueToStore = typeof value === 'string' ? value : JSON.stringify(value);
      localStorage.setItem(localKey, valueToStore);
      saveToCloud({ [key]: value });
    }
  }, [value, key, saveToCloud, hasLoadedFromCloud]);

  return [value, setValue, cloudLoading && !hasLoadedFromCloud];
};

export default useCloudSync;
