export const getScopedKey = (key) => {
  const userStr = localStorage.getItem('currentUser');
  if (!userStr) return key;
  try {
    const user = JSON.parse(userStr);
    const tenantId = user.email || 'guest';
    return `hs_${tenantId}_${key}`;
  } catch (e) {
    return key;
  }
};

export const getScopedData = (key, defaultValue = null) => {
  const scopedKey = getScopedKey(key);
  const data = localStorage.getItem(scopedKey);
  if (!data) return defaultValue;
  try {
    return JSON.parse(data);
  } catch (e) {
    return defaultValue;
  }
};

export const setScopedData = (key, data) => {
  const scopedKey = getScopedKey(key);
  localStorage.setItem(scopedKey, JSON.stringify(data));
};
