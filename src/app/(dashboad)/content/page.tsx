import ContentList from "@/components/content/ContentList";
import GlobalContentPerformance from "@/components/content/GlobalContentPerformance";

const ContentPage = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col gap-6">
        <GlobalContentPerformance />
      </div>
    </div>
  );
};

export default ContentPage;