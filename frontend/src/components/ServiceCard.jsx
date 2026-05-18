const ServiceCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/70 bg-white/90 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(15,23,42,0.14)]">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 opacity-70" />
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
        <Icon size={24} />
      </div>
      <h3 className="mb-2 text-xl font-bold text-slate-950">{title}</h3>
      <p className="leading-7 text-slate-600">{description}</p>
    </div>
  );
};

export default ServiceCard;