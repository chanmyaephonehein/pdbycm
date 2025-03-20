export const fetchEachInquiry = async (id: number) => {
  const response = await fetch(
    `${process.env.NEXT_APP_API_URL}/inquiries/${id}`
  );
  const data = await response.json();
  return data;
};

export const updateInquiry = async (id: number, status: string) => {
  const response = await fetch(
    `${process.env.NEXT_APP_API_URL}/inquiries/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }
  );
  const data = await response.json();
  return data;
};

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  country: string;
  companyName: string;
  jobTitle: string;
  jobDetails: string;
  status: string;
}

export const createInquiry = async (inquiry: Inquiry) => {
  await fetch(`${process.env.NEXT_APP_API_URL}/inquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inquiry),
  });
};
