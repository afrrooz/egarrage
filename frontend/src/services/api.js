const API_BASE = '/api';

export async function fetchHealthStatus() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Backend health check failed');
    return await res.json();
  } catch (err) {
    console.error('Health API error:', err);
    return { status: 'unhealthy', database: { connected: false } };
  }
}

export async function fetchCars(category = 'All') {
  try {
    const url = category && category !== 'All' 
      ? `${API_BASE}/cars?category=${encodeURIComponent(category)}`
      : `${API_BASE}/cars`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch cars');
    return await res.json();
  } catch (err) {
    console.error('Cars API error:', err);
    throw err;
  }
}

export async function fetchAutoParts(category = 'All', search = '') {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search) params.append('search', search);
    
    const res = await fetch(`${API_BASE}/parts?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch auto parts');
    return await res.json();
  } catch (err) {
    console.error('Parts API error:', err);
    throw err;
  }
}

export async function fetchTechInnovations() {
  try {
    const res = await fetch(`${API_BASE}/tech`);
    if (!res.ok) throw new Error('Failed to fetch tech innovations');
    return await res.json();
  } catch (err) {
    console.error('Tech API error:', err);
    throw err;
  }
}

export async function fetchServiceBookings() {
  try {
    const res = await fetch(`${API_BASE}/services`);
    if (!res.ok) throw new Error('Failed to fetch service bookings');
    return await res.json();
  } catch (err) {
    console.error('Service API error:', err);
    throw err;
  }
}

export async function createServiceBooking(bookingData) {
  try {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to submit booking appointment');
    }
    return data;
  } catch (err) {
    console.error('Create booking error:', err);
    throw err;
  }
}
