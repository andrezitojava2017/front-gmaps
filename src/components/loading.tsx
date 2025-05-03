
export const LoadingComp =()=>{
    return (
        <div className="flex items-center justify-center h-screen">
          <div
            className={`border-4 border-t-transparent border-green-400 rounded-full animate-spin w-8 h-8`}
            role="status"
            aria-label="Carregando"
          />
        </div>
      );
}