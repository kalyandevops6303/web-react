import { ChevronRight } from 'lucide-react';

interface FooterProps {
    items: [
        {
            title: string;
            score: string;
            total?: number;
            href?: string;
        }
    ]
}

export default function Footer(props: FooterProps) {

    const { items } = props;


    return (
        <div className="flex w-full md:w-1/2 rounded-[10px] bg-white shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-4 items-center gap-4 h-full">
            {items.map((item, index) => (
                <>
                    <div className="w-1/3 text-center flex flex-col gap-[8px]">
                        <div>
                            <span className="text-center text-[22px] font-semibold leading-[26px] text-[#071013] font-montserrat">
                                {item.score}
                            </span>
                            <span className="text-center text-[14px] font-normal leading-[22px] text-[#838889] font-montserrat">
                                /{item.total}
                            </span>
                        </div>
                        {item.href ?
                            <div className="flex items-center justify-center gap-[4px] text-center text-[14px] font-medium leading-[22px] text-[#0185E4] font-montserrat">
                                <span>{item.title}</span>
                                <ChevronRight size={18} color="#0185E4" />
                            </div>
                            :
                            <div className="text-[14px] font-medium leading-[22px] text-[#838889] font-montserrat">{item.title}</div>
                        }
                    </div>

                    {index !== items.length - 1 && <div className="flex h-[24px] w-[1px] bg-[#E6E7E7]"></div>}
                </>
            ))}
        </div>
    );
}
