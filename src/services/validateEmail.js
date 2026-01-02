import API from "./api";


export async function emailExists(email) {
  if (!email) return false;

  try {
    const { data } = await API.get(`/auth/check-email`, {
      params: { email },
    });

    return Boolean(data.exists);
  } catch (err) {
    console.error("Email check failed:", err.response?.data || err.message);
    return false;
  }
}
