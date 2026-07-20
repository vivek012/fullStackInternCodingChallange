interface DashboardCardProps {
    title: string;
    value: number;
}

const DashboardCard = ({
    title,
    value,
}: DashboardCardProps) => {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-gray-500 text-sm">
                {title}
            </h2>

            <h1 className="text-4xl font-bold mt-3">
                {value}
            </h1>
        </div>
    );
};

export default DashboardCard;