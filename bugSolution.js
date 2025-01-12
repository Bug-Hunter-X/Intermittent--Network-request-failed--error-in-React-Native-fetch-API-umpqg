```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const maxRetries = 3;
    const retryDelay = 2000; // 2 seconds

    const makeRequest = async (retries = 0) => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          if (response.status === 404) { 
            throw new Error('API endpoint not found');
          } else if (response.status >= 500) {
            throw new Error(`Server error: ${response.status}`);
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
        const jsonData = await response.json();
        setData(jsonData);
        return jsonData; 
      } catch (err) {
        if (retries < maxRetries) {
          console.error(`Network request failed. Retrying in ${retryDelay}ms... (Attempt ${retries + 1})`, err);
          await new Promise((resolve) => setTimeout(resolve, retryDelay * (2**retries)));
          return makeRequest(retries + 1);
        } else {
          setError(err); 
          throw err; // Re-throw the error after all retries fail 
        }
      }
    };

    makeRequest();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      {data && data.map((item) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({});
export default MyComponent;
```