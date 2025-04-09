const API_URL = "http://localhost:8000/api";

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    
    if (!response.ok) throw new Error('Gönderiler alınamadı');
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/posts/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Gönderi bulunamadı');
      }
      throw new Error('Gönderi alınamadı');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post ${id}:`, error);
    throw error;
  }
};

export const createPost = async (postData) => {
  const token = localStorage.getItem("token");
  
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) throw new Error('Gönderi oluşturulamadı');
    
    return await response.json();
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const updatePost = async (id, postData) => {
  const token = localStorage.getItem("token");
  
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(postData)
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Gönderi bulunamadı');
      } else if (response.status === 403) {
        throw new Error('Bu işlem için yetkiniz yok');
      }
      throw new Error('Gönderi güncellenemedi');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating post ${id}:`, error);
    throw error;
  }
};

export const deletePost = async (id) => {
  const token = localStorage.getItem("token");
  
  try {
    const response = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Gönderi bulunamadı');
      } else if (response.status === 403) {
        throw new Error('Bu işlem için yetkiniz yok');
      }
      throw new Error('Gönderi silinemedi');
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting post ${id}:`, error);
    throw error;
  }
}; 