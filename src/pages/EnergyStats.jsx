import React from 'react';
import FadeInSection from '../components/FadeInSection';
import '../styles/EnergyStats.css';

function EnergyStats() {
  const cards = [
    {
      title: "Solar Power",
      text: "Harnessing sunlight to produce clean electricity using photovoltaic cells.",
      img: "https://plus.unsplash.com/premium_photo-1680129601999-5f69462ce0ec?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Wind Energy",
      text: "Turbines converting wind into electricity—renewable and emission-free.",
      img: "https://plus.unsplash.com/premium_photo-1680210006806-4f30fe69cfe1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8V0lORCUyMEVORVJHWXxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Hydropower",
      text: "Water flowing through dams or rivers to spin turbines and generate energy.",
      img: "https://cdn.perchenergy.com/cms-assets/american_public_power_association_F_Ueb2npsbl_Q_unsplash_e9af7620da.jpg"
    },
    {
      title: "Geothermal",
      text: "Utilizing Earth's internal heat to generate consistent clean power.",
      img: "https://tse3.mm.bing.net/th/id/OIP.s45TEjoi8u7MQok1gGumxQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
  ];
return (
    <div className="energy-page">
      <FadeInSection>
        <h1>Building a Sustainable & Clean Future</h1>
        <p>
          Tapping into renewables and green design improves air quality and reduces health risks—green infrastructure saves billions and reduces asthma.
        </p>
      </FadeInSection>

      <FadeInSection>
        <div className="card-container">
          {cards.map((item) => (
            <div className="energy-card" key={item.title}>
              <img src={item.img} alt={item.title} className="card-image" />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </FadeInSection>

      <FadeInSection>
        <h2>Interactive Power BI Dashboard</h2>
        <div style={{ position: 'relative', width: '100%', height: '90vh' }}>
          <iframe
            title="Gec_dash_posgresql"
            width="100%"
            height="100%"
            src="https://app.powerbi.com/view?r=eyJrIjoiODUxMjY4ZDAtYzBkOC00NjZiLWJhMGYtNzAwMDcyNGM4ZGM4IiwidCI6ImQxZjE0MzQ4LWYxYjUtNGEwOS1hYzk5LTdlYmYyMTNjYmM4MSIsImMiOjEwfQ%3D%3D"
            frameBorder="0"
            allowFullScreen
            style={{ width: '100%', height: '100%', border: 'none' }}
          ></iframe>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '40px',
              backgroundColor: 'white',
            }}
          ></div>
        </div>
      </FadeInSection>
    </div>
  );
}

export default EnergyStats;