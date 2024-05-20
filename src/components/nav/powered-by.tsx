import Image from 'next/image';

export default function PoweredBy() {
    return (
        <>
            <div className="flex text-slate-500 justify-center text-xs">powered by</div>
            <div className="flex justify-center items-center mb-4">
                <Image 
                    src="https://assets-global.website-files.com/634690d9583ce36a5e30c703/64d1cb0eb63687bac08f6768_Symphonize_Logo.svg" 
                    loading="lazy" 
                    width={110} 
                    height={50}
                    alt="Symphonize, Inc." />
            </div>
        </>
    );
  }