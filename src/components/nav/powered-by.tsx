import Image from 'next/image';

export default function PoweredBy() {
    return (
        <>
            <div className="flex justify-center text-sm">powered by</div>
            <div className="flex justify-center items-center lg:mb-4">
                <Image 
                    src="/symphonize_logo_white.png" 
                    loading="lazy" 
                    width={125} 
                    height={38}
                    alt="Symphonize, Inc." />
            </div>
        </>
    );
  }