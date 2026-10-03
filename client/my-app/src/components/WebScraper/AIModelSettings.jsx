import React, { useState, useEffect } from 'react';
import { FiSettings, FiSave, FiSliders, FiInfo, FiAlertCircle, FiCheck, FiX } from 'react-icons/fi';
import { AiOutlineBulb, AiOutlineRobot } from 'react-icons/ai';
import axios from 'axios';

export default function AIModelSettings() {
  const [settings, setSettings] = useState({
    modelName: 'product-ranking-v2',
    minConfidenceThreshold: 60,
    maxProductsToProcess: 50,
    preferredCategories: ['Jewelry'],
    rankingFactors: {
      price: 3,
      quality: 4,
      popularity: 5,
      reviews: 4,
      features: 3,
    },
    autoSelectRecommended: true,
    autoProcessImages: true,
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/settings');
        setSettings(response.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
        setErrorMessage('Failed to load settings: ' + (error.response?.data?.message || error.message));
      }
    };
    fetchSettings();
  }, []);

  const handleRankingFactorChange = (factor, value) => {
    setSettings({
      ...settings,
      rankingFactors: {
        ...settings.rankingFactors,
        [factor]: parseInt(value),
      },
    });
  };

  const handleSettingChange = (setting, value) => {
    setSettings({
      ...settings,
      [setting]: value,
    });
  };

  const handleCategoryToggle = (category) => {
    if (settings.preferredCategories.includes(category)) {
      setSettings({
        ...settings,
        preferredCategories: settings.preferredCategories.filter(c => c !== category),
      });
    } else {
      setSettings({
        ...settings,
        preferredCategories: [...settings.preferredCategories, category],
      });
    }
  };

  const handleSaveSettings = async () => {
    try {
      await axios.post('http://localhost:3001/api/settings', settings);
      setSuccessMessage('Settings saved successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setErrorMessage('Failed to save settings: ' + (error.response?.data?.message || error.message));
    }
  };

  const availableCategories = [
    'Jewelry', 'Electronics', 'Home & Kitchen', 'Clothing', 'Beauty', 'Sports',
    'Toys & Games', 'Books', 'Automotive', 'Health', 'Food & Grocery',
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-4 bg-white">
        <h1 className="text-xl px-3 mt-2">AI Model Settings</h1>
        <button 
          className="px-4 py-2 flex items-center font-semibold text-white bg-cyan-500 hover:bg-cyan-600 focus:ring focus:ring-cyan-300 rounded-lg focus:outline-none"
          onClick={handleSaveSettings}
        >
          <FiSave className="mr-2" />
          Save Settings
        </button>
      </div>

      {/* Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <AiOutlineRobot className="mr-2 text-cyan-500" />
                Model Configuration
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    value={settings.modelName}
                    onChange={(e) => handleSettingChange('modelName', e.target.value)}
                  >
                    <option value="product-ranking-v1">Product Ranking v1</option>
                    <option value="product-ranking-v2">Product Ranking v2</option>
                    <option value="product-ranking-v3-beta">Product Ranking v3 (Beta)</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Minimum Confidence Threshold ({settings.minConfidenceThreshold}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    value={settings.minConfidenceThreshold}
                    onChange={(e) => handleSettingChange('minConfidenceThreshold', parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Include more products</span>
                    <span>Higher quality</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Maximum Products to Process
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-cyan-500 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
                    value={settings.maxProductsToProcess}
                    min="1"
                    max="100"
                    onChange={(e) => handleSettingChange('maxProductsToProcess', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FiSliders className="mr-2 text-cyan-500" />
                Ranking Factors
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">Adjust the importance of each factor in product ranking (1 = Less important, 5 = Very important)</p>
                
                {Object.entries(settings.rankingFactors).map(([factor, value]) => (
                  <div key={factor} className="mb-4">
                    <label className="flex justify-between text-sm font-medium text-gray-700 mb-1">
                      <span className="capitalize">{factor}</span>
                      <span className="text-gray-500">{value}/5</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      value={value}
                      onChange={(e) => handleRankingFactorChange(factor, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div>
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <AiOutlineBulb className="mr-2 text-cyan-500" />
                Preferred Categories
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">Select categories to prioritize in product recommendations</p>
                
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <button
                      key={category}
                      className={`px-3 py-1 rounded-full text-sm ${
                        settings.preferredCategories.includes(category)
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FiSettings className="mr-2 text-cyan-500" />
                Automation Settings
              </h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Auto-select Recommended Products</p>
                    <p className="text-xs text-gray-500">Automatically select products marked as recommended by AI</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={settings.autoSelectRecommended}
                      onChange={(e) => handleSettingChange('autoSelectRecommended', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between py-2 border-t border-gray-200">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Auto-process Images</p>
                    <p className="text-xs text-gray-500">Automatically optimize and normalize product images</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer"
                      checked={settings.autoProcessImages}
                      onChange={(e) => handleSettingChange('autoProcessImages', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Performance Note
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Processing large numbers of products with AI may take longer and consume more resources.
                      For optimal performance, we recommend limiting batch sizes to 50-100 products.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  );
}