interface CreatorProfileHeaderProps {
  name: string;
  category: string;
  followers: string;
  username: string;
  email: string;
  instagramUserId: string;
  phone: string;
  joinedDate: string;
  lastActive: string;
  avatar?: string;
  onBlock?: () => void;
}

export default function CreatorProfileHeader({
  name,
  category,
  followers,
  username,
  email,
  instagramUserId,
  phone,
  joinedDate,
  lastActive,
  avatar,
  onBlock,
}: CreatorProfileHeaderProps) {
  return (
    <div className="bg-white border border-[#eeeeee] rounded p-4 flex flex-col gap-5">
      {/* Header with Name and Block Button */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-medium text-black">{name}</h2>
        <button
          onClick={onBlock}
          className="bg-[#ffefef] text-[#e66464] px-3 py-2 rounded text-[13px] font-medium hover:bg-[#ffe0e0] transition-colors"
        >
          Block
        </button>
      </div>

      {/* Profile Details Grid */}
      <div className="flex items-start justify-between gap-4">
        {/* Profile Picture */}
        <div className="flex flex-col gap-4">
          <p className="text-[9px] text-[#787878]">Profile Picture</p>
          <div className="w-[51px] h-[51px] rounded-full bg-[#e8ddff] overflow-hidden">
            {avatar ? (
              <img src={avatar} alt={name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#683fbe] font-medium text-xl">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Category & Followers */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Category</p>
            <p className="text-[10px] text-black">{category}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Followers</p>
            <p className="text-[10px] text-black">{followers}</p>
          </div>
        </div>

        {/* Username & Email */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Username</p>
            <p className="text-[10px] text-black">{username}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Email</p>
            <p className="text-[10px] text-black">{email}</p>
          </div>
        </div>

        {/* Instagram ID & Phone */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Instagram User ID</p>
            <p className="text-[10px] text-black">{instagramUserId}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Phone</p>
            <p className="text-[10px] text-black">{phone}</p>
          </div>
        </div>

        {/* Joined Date & Last Active */}
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Joined Date</p>
            <p className="text-[10px] text-black">{joinedDate}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[9px] text-[#787878]">Last Active</p>
            <p className="text-[10px] text-black">{lastActive}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
