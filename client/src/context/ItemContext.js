import { createContext, useEffect, useState } from "react";

const itemContext = createContext();

// Custom Provider Component
function CustomItemContext({ children }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [itemsInCart, setItemsInCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	// useEffect to load all the products
	useEffect(() => {
		// Fetch products from the backend
		const fetchData = async () => {
			try {
				const API_URL = "http://localhost:5089/api/products"; // Correct API endpoint
				const response = await fetch(API_URL);

				if (!response.ok) {
					throw new Error("Failed to fetch products");
				}

				const products = await response.json();
				console.log(products);
				setProducts(products);
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		};

		fetchData();
	}, []);

	// Function to add a product to the cart
	const addToCart = (product) => {
		setTotalPrice((prevPrice) => prevPrice + product.price);
		setCart((prevCart) => [...prevCart, product]);
		setItemsInCart((prevCount) => prevCount + 1);
	};

	// Function to remove a product from the cart
	const removeFromCart = (product) => {
		const index = cart.findIndex((prdt) => prdt._id === product._id);

		if (index !== -1) {
			// Remove the item from the cart array
			const updatedCart = [...cart];
			updatedCart.splice(index, 1);
			setTotalPrice((prevPrice) => prevPrice - cart[index].price);
			setCart(updatedCart);
			setItemsInCart((prevCount) => prevCount - 1);
		} else {
			console.log("Item not found in the cart");
		}
	};

	return (
		// Context Provider
		<itemContext.Provider
			value={{
				products,
				addToCart,
				removeFromCart,
				itemsInCart,
				totalPrice,
			}}
		>
			{children}
		</itemContext.Provider>
	);
}

export { itemContext };
export default CustomItemContext;
