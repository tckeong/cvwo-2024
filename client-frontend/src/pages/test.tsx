import React, { useEffect } from 'react';

function Test() {
  useEffect(() => {
    // This code will run only once when the component mounts
    console.log('Component mounted');
    // Perform any initialization logic here
    // For example, fetching data, setting up subscriptions, etc.
    
    // If you want to clean up the effect when the component unmounts,
    // you can return a cleanup function from the effect
    return () => {
      // Clean-up logic here
      // For example, unsubscribe from a subscription
      console.log('Component unmounted');
    };
  }, []); // Empty dependency array ensures this effect runs only once

  // Rest of your component's code
  return <div>My Component</div>;
}

export default Test;
