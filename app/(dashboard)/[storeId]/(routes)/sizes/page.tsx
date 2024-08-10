import { format } from "date-fns";
import SizeBilboard from "./components/client";
import prismadb from "@/lib/prismadb";
import { SizeColumn } from "./components/columns";


const SizesPage = async ({ params }: { params: { storeId: string } }) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params?.storeId,
        }
    });
    const formattedSizes: SizeColumn[] = sizes.map((size) => ({
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: format(size.createdAt, "MMMM do, yyyy"),
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeBilboard data={formattedSizes} />
            </div>
        </div>
    );
};

export default SizesPage;
