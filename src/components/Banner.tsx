interface BannerProps {
    title: string;
}

const Banner = ({ title }: BannerProps) => (
    <>
        <h1 style={{ textAlign: "center", fontWeight: "bold", fontSize: "30px" }}>{title}</h1>
    </>
);

export default Banner;