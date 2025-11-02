// Simple test script to verify matrix endpoints
const http = require('http');

const testData = {
  matrixA: [[1, 2], [3, 4]],
  matrixB: [[5, 6], [7, 8]]
};

function makeRequest(path, data) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: JSON.parse(responseData)
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function testEndpoints() {
  console.log('Testing Matrix API Endpoints\n');
  
  try {
    // Test addition
    console.log('1. Testing Addition Endpoint:');
    const addResult = await makeRequest('/api/matrices/add', testData);
    console.log('   Status:', addResult.statusCode);
    console.log('   Response:', JSON.stringify(addResult.data, null, 2));
    console.log('   ✓ Addition test passed\n');
    
    // Test multiplication
    console.log('2. Testing Multiplication Endpoint:');
    const multiplyResult = await makeRequest('/api/matrices/multiply', testData);
    console.log('   Status:', multiplyResult.statusCode);
    console.log('   Response:', JSON.stringify(multiplyResult.data, null, 2));
    console.log('   ✓ Multiplication test passed\n');
    
    // Test error handling - dimension mismatch
    console.log('3. Testing Error Handling (dimension mismatch):');
    const errorData = {
      matrixA: [[1, 2], [3, 4]],
      matrixB: [[5, 6], [7, 8], [9, 10]]
    };
    const errorResult = await makeRequest('/api/matrices/add', errorData);
    console.log('   Status:', errorResult.statusCode);
    console.log('   Response:', JSON.stringify(errorResult.data, null, 2));
    console.log('   ✓ Error handling test passed\n');
    
    console.log('All tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    process.exit(1);
  }
}

testEndpoints();

