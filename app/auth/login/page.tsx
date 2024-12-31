export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoginForm />
        </div>
        );
    }
  // /components/auth/LoginForm.tsx
export default function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      // Implement authentication logic
    };
    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
            // Form implementation
        </form>
    );
}