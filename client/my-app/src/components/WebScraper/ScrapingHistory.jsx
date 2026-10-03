import React, { useState, useEffect } from 'react';
import { FiCalendar, FiLink, FiInfo, FiExternalLink, FiX } from 'react-icons/fi';
import { AiOutlineClockCircle } from 'react-icons/ai';
import axios from 'axios';

export default function ScrapingHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/scraping-history');
        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching history:', error);
        setErrorMessage('Failed to load scraping history: ' + (error.response?.data?.message || error.message));
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex shadow-lg rounded-t-3xl shadow-lg flex-row sm:flex-row justify-between p-4 bg-white">
        <h1 className="text-xl px-3 mt-2">Scraping History</h1>
      </div>

      {/* Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">Previous Scraping Sessions</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
          </div>
        ) : errorMessage ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiX className="h-5 w-5 text-red-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm">{errorMessage}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products Scraped
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products Added
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    AI Score Range
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {history.map((session) => {
                  const scoreRange = session.scoreRange || 'N/A';
                  const scoreWidth = scoreRange !== 'N/A' ? '80%' : '0%'; // Adjust based on actual range
                  return (
                    <tr key={session.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FiCalendar className="text-gray-400 mr-2" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{session.date}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <AiOutlineClockCircle className="mr-1" /> {session.time}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <FiLink className="text-gray-400 mr-2" />
                          <div className="text-sm text-gray-900 max-w-xs truncate">
                            {session.url}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {session.productsScraped}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {session.productsAdded}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-green-500" style={{ width: scoreWidth }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-600">{scoreRange}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-cyan-600 hover:text-cyan-900 mr-4 flex items-center">
                          <FiInfo className="mr-1" /> Details
                        </button>
                        <button className="text-cyan-600 hover:text-cyan-900 flex items-center">
                          <FiExternalLink className="mr-1" /> Visit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}