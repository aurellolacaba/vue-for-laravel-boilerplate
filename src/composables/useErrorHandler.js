import { useRouter } from 'vue-router';

export function useErrorHandler() {
    const router = useRouter();

    const handleApiError = (error) => {
        if (error) {
            switch (error.status) {
                case 404:
                    router.push({ name: 'notFound' });  // Replace 'NotFound' with your 404 route name
                    break;
                // You can handle other status codes here if needed
                default:
                    console.error('API Error:', error.message);
            }
        } else {
            console.error('Unexpected Error:', error);
        }
    };

    return {
        handleApiError,
    };
}