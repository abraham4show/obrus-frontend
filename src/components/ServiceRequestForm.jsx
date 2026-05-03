import { useState } from 'react';
import { api } from '../api/client';

export function ServiceRequestForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    email: '',
    location: '',
    service_type: 'manpower',
    service_details: {},
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    try {
      await api.createServiceRequest(formData);
      setSubmitted(true);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (submitted) {
    return <div>Service request submitted successfully!</div>;
  }

  return (
    <div>
      {step === 1 && (
        <div>
          <h2>Step 1: Contact Info</h2>
          <input
            placeholder="Full Name"
            value={formData.full_name}
            onChange={(e) => setFormData({...formData, full_name: e.target.value})}
          />
          <input
            placeholder="Company (optional)"
            value={formData.company_name}
            onChange={(e) => setFormData({...formData, company_name: e.target.value})}
          />
          <input
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <button onClick={() => setStep(2)}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Step 2: Service Details</h2>
          <select
            value={formData.service_type}
            onChange={(e) => setFormData({...formData, service_type: e.target.value})}
          >
            <option value="manpower">Manpower</option>
            <option value="facility">Facility</option>
            <option value="environmental">Environmental</option>
            <option value="equipment">Equipment</option>
          </select>
          
          <textarea
            placeholder="Location"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}