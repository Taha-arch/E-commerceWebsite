import React, { useState, useEffect } from 'react';
import { FiSearch, FiLoader, FiCheck, FiX, FiChevronRight } from 'react-icons/fi';
import { AiOutlineRobot } from 'react-icons/ai';
import { TbWorldUpload } from 'react-icons/tb';
import { BsListCheck } from 'react-icons/bs';
import axios from 'axios';

export default function WebScraperDashboard() {
  const [url, setUrl] = useState('https://mejuri.com/world/en/collections/rings');
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedProducts, setScrapedProducts] = useState([]);
  const [processedProducts, setProcessedProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [progress, setProgress] = useState(0);

  // Base URLs for the backend services
  const FASTAPI_URL = 'http://localhost:8000';  // FastAPI server for scraping
  const EXPRESS_URL = 'http://localhost:3001';  // Express server for database operations

  // Function to handle web scraping
  const handleScrapeData = async () => {
    if (!url) {
      setErrorMessage('Please enter a valid URL.');
      return;
    }

    setIsScraping(true);
    setErrorMessage('');
    setProgress(0);

    try {
      await axios.post(`${FASTAPI_URL}/scrape`, {
        url,
        max_pages: 3,
        max_products: 10,
      });

      // Poll for progress
      const pollProgress = setInterval(async () => {
        try {
          const progressResponse = await axios.get(`${FASTAPI_URL}/scrape-progress`);
          setProgress(progressResponse.data.progress || 0);
          if (progressResponse.data.progress >= 100) {
            clearInterval(pollProgress);
            // Fetch the scraped products after completion
            const productsResponse = await axios.get(`${FASTAPI_URL}/scraped-products`);
            setScrapedProducts(productsResponse.data.products || []);
            setIsScraping(false);
            setStep(2);
            setProgress(0);
          }
        } catch (err) {
          console.error('Error polling progress:', err);
          clearInterval(pollProgress);
          setIsScraping(false);
          setErrorMessage('Failed to fetch scraping progress: ' + (err.response?.data?.detail || err.message));
        }
      }, 2000);
    } catch (error) {
      console.error('Error scraping data:', error);
      setIsScraping(false);
      setErrorMessage('Failed to scrape data: ' + (error.response?.data?.detail || error.message));
    }
  };

  // Function to process data with deep learning
  const handleProcessData = async () => {
    setIsProcessing(true);
    setErrorMessage('');
    setProgress(0);

    try {
      await axios.get(`${FASTAPI_URL}/process`);

      // Poll for progress
      const pollProgress = setInterval(async () => {
        try {
          const progressResponse = await axios.get(`${FASTAPI_URL}/process-progress`);
          setProgress(progressResponse.data.progress || 0);
          if (progressResponse.data.progress >= 100) {
            clearInterval(pollProgress);
            // Fetch processed products after completion
            const processResponse = await axios.get(`${FASTAPI_URL}/processed-products`);
            const processedData = (processResponse.data.products || []).map(product => ({
              ...product,
              id: product.sku,
              score: Math.round(product.bestseller_probability * 100),
              recommended: product.bestseller_probability > 0.5,
            }));

            // Deduplicate processed products by SKU
            const uniqueProcessedData = processedData.filter(
              (product, index, self) =>
                index === self.findIndex((p) => p.sku === product.sku)
            );

            setProcessedProducts(uniqueProcessedData);
            setSelectedProducts(uniqueProcessedData.filter(p => p.recommended));
            setIsProcessing(false);
            setStep(3);
            setProgress(0);
          }
        } catch (err) {
          console.error('Error polling progress:', err);
          clearInterval(pollProgress);
          setIsProcessing(false);
          setErrorMessage('Failed to fetch processing progress: ' + (err.response?.data?.detail || err.message));
        }
      }, 2000);
    } catch (error) {
      console.error('Error processing data:', error);
      setIsProcessing(false);
      setErrorMessage('Failed to process data: ' + (error.response?.data?.detail || error.message));
    }
  };

  // Function to add products to database
  const handleAddToDatabase = async () => {
    try {
      const response = await axios.post(`${EXPRESS_URL}/api/scraper/add-scraped`, {
        products: selectedProducts
          .map(product => ({
            product_name: product.product_name,
            price: product.price,
            short_description: product.short_description,
            long_description: product.long_description,
            product_image: product.product_image,
            sku: product.sku,
            quantity: product.quantity, 
          })),
      });

      setSuccessMessage(`Successfully added ${selectedProducts.length} products to database!`);
      setTimeout(() => {
        setSuccessMessage('');
        setStep(1);
        setUrl('');
        setScrapedProducts([]);
        setProcessedProducts([]);
        setSelectedProducts([]);
      }, 3000);
    } catch (error) {
      console.error('Error adding products to database:', error);
      setErrorMessage('Failed to add products to database: ' + (error.response?.data?.message || error.message));
    }
  };

  const toggleProductSelection = (productId) => {
    setSelectedProducts(prevSelected => {
      if (prevSelected.some(p => p.id === productId)) {
        return prevSelected.filter(p => p.id !== productId);
      } else {
        const productToAdd = processedProducts.find(p => p.id === productId);
        return [...prevSelected, productToAdd];
      }
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-4 bg-white">
        <h1 className="text-xl px-3 mt-2">Product Data Scraper</h1>
      </div>
      
      {/* Stepper */}
      <div className="flex justify-center mt-6 mb-8">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-cyan-500 text-white' : 'bg-gray-200'}`}>
            <TbWorldUpload className="w-6 h-6" />
          </div>
          <div className={`w-24 h-1 ${step >= 2 ? 'bg-cyan-500' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 2 ? 'bg-cyan-500 text-white' : 'bg-gray-200'}`}>
            <AiOutlineRobot className="w-6 h-6" />
          </div>
          <div className={`w-24 h-1 ${step >= 3 ? 'bg-cyan-500' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 3 ? 'bg-cyan-500 text-white' : 'bg-gray-200'}`}>
            <BsListCheck className="w-6 h-6" />
          </div>
        </div>
      </div>
      
      {/* Content based on step */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">Step 1: Enter Website URL to Scrape</h2>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-600 focus:border-cyan-500 focus:outline-none"
                placeholder="Enter website URL (e.g., https://mejuri.com/world/en/collections/rings)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <FiSearch className="absolute right-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
            
            <button
              className="w-full px-4 py-3 flex justify-center font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
              onClick={handleScrapeData}
              disabled={!url || isScraping}
            >
              {isScraping ? (
                <>
                  <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                  Scraping... ({progress}%)
                </>
              ) : (
                "Start Scraping"
              )}
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">Step 2: Process Scraped Data</h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Source URL:</span> {url}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Products Found:</span> {scrapedProducts?.length || 0}
              </p>
            </div>
            
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {scrapedProducts?.length > 0 ? (
                    scrapedProducts.map((product) => (
                      <tr key={product.sku}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img src={product.product_image[0]} alt={product.product_name} className="w-12 h-12 rounded-lg object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.product_name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="flex space-x-4">
              <button
                className="flex-1 px-4 py-3 flex justify-center font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none"
                onClick={() => setStep(1)}
              >
                Back
              </button>
              <button
                className="flex-1 px-4 py-3 flex justify-center font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300"
                onClick={handleProcessData}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <FiLoader className="w-5 h-5 mr-2 animate-spin" />
                    Processing with AI... ({progress}%)
                  </>
                ) : (
                  "Process with Deep Learning"
                )}
              </button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-700">Step 3: Review and Add Products</h2>
            <div className="bg-gray-50 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Products Processed:</span> {processedProducts.length}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium">Products Selected:</span> {selectedProducts.length}
                </p>
              </div>
              <div>
                <button
                  className="px-4 py-2 text-sm font-medium text-cyan-700 hover:text-cyan-900"
                  onClick={() => setSelectedProducts(processedProducts.filter(p => p.recommended))}
                >
                  Select Recommended Only
                </button>
                <button
                  className="px-4 py-2 text-sm font-medium text-cyan-700 hover:text-cyan-900 ml-2"
                  onClick={() => setSelectedProducts(processedProducts)}
                >
                  Select All
                </button>
              </div>
            </div>
            
            <div className="max-h-96 overflow-y-auto border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Select</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {processedProducts.map((product) => (
                    <tr key={product.id} className={selectedProducts.some(p => p.id === product.id) ? "bg-cyan-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                          checked={selectedProducts.some(p => p.id === product.id)}
                          onChange={() => toggleProductSelection(product.id)} 
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={product.product_image[0]} alt={product.product_name} className="w-12 h-12 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                product.score > 70 ? 'bg-green-500' : 
                                product.score > 40 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${product.score}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-600">{product.score}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.recommended ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Recommended
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                            Optional
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex space-x-4">
              <button
                className="flex-1 px-4 py-3 flex justify-center font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg focus:outline-none"
                onClick={() => setStep(2)}
              >
                Back
              </button>
              <button
                className="flex-1 px-4 py-3 flex justify-center font-semibold text-white bg-cyan-500 hover:bg-cyan-600 rounded-lg focus:outline-none focus:ring focus:ring-cyan-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                onClick={handleAddToDatabase}
                disabled={selectedProducts.length === 0}
              >
                Add {selectedProducts.length} Products to Database
              </button>
            </div>
          </div>
        )}
        
        {/* Success message */}
        {successMessage && (
          <div className="absolute top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md animate-fade-in-out">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiCheck className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {errorMessage && (
          <div className="absolute top-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md animate-fade-in-out">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiX className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}