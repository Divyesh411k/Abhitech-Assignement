import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import jsonData from '../annual_co2_emissions.json';
import '../styles/CarbonEmissions.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a83232', '#7e57c2', '#26a69a', '#ffa726', '#8d6e63', '#42a5f5'];

const CarbonEmissions = () => {
  const [data, setData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [topEmissions, setTopEmissions] = useState([]);
  const [highestEmitter, setHighestEmitter] = useState(null);
  const [averageEmissions, setAverageEmissions] = useState(null);
  const [totalByCountry, setTotalByCountry] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    contact: '',
    message: ''
  });

  useEffect(() => {
    const emissionKey = 'Annual CO₂ emissions';

    const parsedData = jsonData
      .filter(row => row.Entity && row.Year && row[emissionKey] && !isNaN(row[emissionKey]))
      .map(row => ({
        entity: row.Entity,
        year: +row.Year,
        emissions: +row[emissionKey]
      }));

    const uniqueCountries = Array.from(new Set(parsedData.map(d => d.entity))).sort();
    setCountries(uniqueCountries);
    setSelectedCountry(uniqueCountries[0]);
    setData(parsedData);

    const totals = {};
    let totalEmissions = 0;
    let totalYears = 0;

    parsedData.forEach(row => {
      totals[row.entity] = (totals[row.entity] || 0) + row.emissions;
      totalEmissions += row.emissions;
      totalYears++;
    });

    const top10 = Object.entries(totals)
      .map(([key, value]) => ({ name: key, value: value / 1_000_000_000 }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);

    const countryTotals = Object.entries(totals)
      .map(([entity, value]) => ({ entity, emissions: value }))
      .sort((a, b) => b.emissions - a.emissions)
      .slice(0, 20);

    const topEmitter = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];
    const avgEmission = (totalEmissions / totalYears).toFixed(2);

    setTopEmissions(top10);
    setHighestEmitter({ name: topEmitter[0], value: topEmitter[1] });
    setAverageEmissions(avgEmission);
    setTotalByCountry(countryTotals);
    setLoading(false);
  }, []);

  const countryData = data
    .filter(d => d.entity === selectedCountry)
    .sort((a, b) => a.year - b.year);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    alert('Thanks! We will get back to you shortly.');
  };

  if (loading) return <p className="loading">Loading data...</p>;

  return (
    <div className="carbon-container">
      <h1 className="carbon-title">Annual CO₂ Emissions by Country</h1>

      <div className="cards-wrapper">
        <div className="info-card">
          <img src="https://plus.unsplash.com/premium_photo-1664298311043-46b3814a511f?q=80&w=1183&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Fossil Fuels" />
          <p>Emissions from fossil fuels are the primary driver of CO₂ buildup in the atmosphere.</p>
        </div>
        <div className="info-card">
          <img src="https://www.creativefabrica.com/wp-content/uploads/2023/02/09/Industrial-Carbon-Dioxide-Pollution-Graphics-60565819-1.png" alt="Industry" />
          <p>Industrial production contributes significantly to annual CO₂ levels globally.</p>
        </div>
        <div className="info-card">
          <img src="https://carfromjapan.com/wp-content/uploads/2019/10/car-pollution.jpg" alt="Transport" />
          <p>Transport emissions come from cars, aviation, and shipping, all growing steadily.</p>
        </div>
        <div className="info-card">
          <img src="https://storage.googleapis.com/lemu-web-prod/deforestation_3fce99b7b3/deforestation_3fce99b7b3.jpg" alt="Deforestation" />
          <p>Deforestation reduces carbon absorption, significantly increasing atmospheric CO₂ levels.</p>
        </div>
      </div>
      

      <div className="kpi-wrapper">
        <div className="kpi-card fade-in">
          <h3>Top Emitter</h3>
          <p className="kpi-value">{highestEmitter?.name}</p>
        </div>
        <div className="kpi-card fade-in">
          <h3>Average Emissions</h3>
          <p className="kpi-value">{averageEmissions} tons/year</p>
        </div>
      </div>

      <div className="dropdown-wrapper">
        <label>
          Select Country:&nbsp;
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
          >
            {countries.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <div className="chart-section">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={countryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="emissions" stroke="#2e7d32" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <h2 className="chart-title">Top 10 Countries by Total CO₂ Emissions</h2>
      <div className="chart-section">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={topEmissions}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) => `${name}: ${value.toFixed(2)}B`}
            >
              {topEmissions.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value.toFixed(2)} B tons`, 'Emissions']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <h2 className="chart-title">Total CO₂ Emissions by Country</h2>
      <div className="chart-section horizontal-scroll">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart layout="vertical" data={totalByCountry} margin={{ left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="entity" width={150} />
            <Tooltip />
            <Legend />
            <Bar dataKey="emissions" fill="#66bb6a" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <form className="ccus-form" onSubmit={handleSubmit}>
        <h2>Learn More About Carbon Capture & Utilization (CCU)</h2>
        <p>
          Interested in our CCU process? Fill out the form and our team will reach out to walk you through our modular carbon capture and utilization solutions.
        </p>
        <div className="form-group">
          <label>Name*</label>
          <input name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Company*</label>
          <input name="company" value={formData.company} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email*</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Contact No.*</label>
          <input name="contact" value={formData.contact} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>How can we assist you?*</label>
          <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="E.g., interested in pilot setup, ROI, module scaling..." />
        </div>
        <button type="submit">Send Inquiry</button>
      </form>
    </div>
  );
};

export default CarbonEmissions;
