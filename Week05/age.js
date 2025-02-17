class UserManager {
    constructor() {
        this.users = []; // Array to store user data
    }

    // Function to validate email
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to validate date and calculate age
    calculateAge(birthdate) {
        const birthDateObj = new Date(birthdate);
        if (isNaN(birthDateObj)) {
            throw new Error("Invalid birthdate format. Use YYYY-MM-DD.");
        }

        const today = new Date();
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--; // Adjust if birthday hasn't occurred yet this year
        }

        return age;
    }

    // Function to register a new user with validations
    registerUser(name, email, birthdate) {
        try {
            // Input Validations
            if (!name || !email || !birthdate) {
                throw new Error("All fields (name, email, birthdate) are required.");
            }

            if (name.length < 3) {
                throw new Error("Name must be at least 3 characters long.");
            }

            if (!this.isValidEmail(email)) {
                throw new Error("Invalid email format.");
            }

            const age = this.calculateAge(birthdate);

            if (age < 18) {
                throw new Error("User must be at least 18 years old to register.");
            }

            // Store user in array
            const user = { name, email, birthdate, age };
            this.users.push(user);
            console.log(`✅ User registered successfully:`, user);
        } catch (error) {
            console.error(`❌ Error: ${error.message}`);
        }
    }

    // Function to display all registered users
    listUsers() {
        if (this.users.length === 0) {
            console.log("📭 No users registered yet.");
        } else {
            console.log("📋 Registered Users:");
            this.users.forEach((user, index) => {
                console.log(`${index + 1}. ${user.name} - ${user.email} - Age: ${user.age}`);
            });
        }
    }
}

// Example Usage
const userManager = new UserManager();

userManager.registerUser("Alice", "alice@example.com", "2000-05-10"); // ✅ Valid
userManager.registerUser("Bob", "bob@example", "2005-08-15"); // ❌ Invalid email
userManager.registerUser("Charlie", "charlie@example.com", "2010-03-22"); // ❌ Too young

userManager.listUsers();
