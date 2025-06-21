// ExpenseShareApp/src/api/auth.ts

interface LoginResponse {
    token: string;
    message?: string;
// Add other fields you expect from your backend login response
}

export const loginUser = async (username: string, password: string, baseUrl: string): Promise<LoginResponse> => {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
    }
    return response.json();
    };

    export const fetchGroups = async (token: string, baseUrl: string): Promise<any> => { // Use 'any' for data for now, define specific type later
    const response = await fetch(`${baseUrl}/groups`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
        const errorData = await response.json();
        const error = new Error(errorData.message || 'Unauthorized');
        (error as any).response = response; // Attach response for specific handling in context
        throw error;
        }
        const errorData = await response.json();
        throw new Error(errorData.message || response.statusText);
    }
    return response.json();
};
          