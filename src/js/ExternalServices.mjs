const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();

  if (res.ok) {
    return jsonResponse;
  } else {
    throw {
      name: "servicesError",
      message: jsonResponse,
    };
  }
}

export default class ExternalServices {
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async searchProducts(query) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];

    const results = await Promise.all(
      categories.map((category) => this.getData(category)),
    );

    const allProducts = results.flat();
    const searchTerm = query.toLowerCase().trim();

    return allProducts.filter((product) => {
      const name = product.Name?.toLowerCase() || "";
      const brand = product.Brand?.Name?.toLowerCase() || "";

      return name.includes(searchTerm) || brand.includes(searchTerm);
    });
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(`${baseURL}checkout`, options);
    return await convertToJson(response);
  }
}
