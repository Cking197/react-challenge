import { signInWithGoogle, signOut, useAuthState } from "../utilities/firebase";

interface BannerProps {
    title: string;
}

const Banner = ({ title }: BannerProps) => {
    const { user } = useAuthState();
    return (
        <header className="flex items-center justify-between py-4 px-4">
            {/* Left spacer to help center the title */}
            <div style={{ flex: 1 }} />

            {/* Centered title */}
            <h1 className="text-center font-bold text-2xl flex-none">
                {title}
            </h1>

            {/* Sign-in area aligned to the right on the same line */}
            <div style={{ flex: 1 }} className="flex justify-end">
                {user ? (
                    <button
                        className="px-3 py-1 border rounded bg-blue-500 text-white"
                        onClick={() => signOut()}>
                        Sign Out
                    </button>
                ) : (
                    <button
                        className="px-3 py-1 border rounded bg-blue-500 text-white"
                        onClick={() => signInWithGoogle()}>
                        Sign in
                    </button>
                )}
            </div>
        </header>
    );
};

export default Banner;