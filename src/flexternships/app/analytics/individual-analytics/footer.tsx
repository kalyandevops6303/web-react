import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

interface FooterProps {
  items: {
    title: string;
    score: string;
    total?: number;
    href?: string;
  }[];
}

const styles = {
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none',
};

export default function Footer(props: Readonly<FooterProps>) {
  const { items } = props;

  return (
    <div className="flex flex-col md:flex-row w-full md:w-1/2 rounded-10 bg-white shadow-card p-4 items-center gap-4 h-full">
      {items?.map((item, index) => (
        <>
          <div className="w-1/3 text-center flex flex-col gap-2">
            <div>
              <span className="text-center text-xxl leading-xxl-custom font-semibold text-dark font-montserrat">
                {item.score}
              </span>
              {item.total && (
                <span className="text-center text-sm leading-sm-custom font-normal text-grey-500 font-montserrat">
                  /{item.total}
                </span>
              )}
            </div>
            {item.href ? (
              <Link to={item.href} className={item.score === '0' ? styles.disabled : ''}>
                <div className="flex items-center gap-1 justify-center text-center text-sm leading-sm-custom font-medium text-trublue-secondary-500 font-montserrat md:truncate cursor-pointer">
                  <span>{item.title}</span>
                  <ChevronRight size={18} className="text-trublue-secondary-500" />
                </div>
              </Link>
            ) : (
              <div className="text-sm leading-5.5 font-medium text-grey-500 font-montserrat truncate max-w-full">
                {item.title}
              </div>
            )}
          </div>

          {index !== items.length - 1 && <div className="flex h-6 w-px bg-grey-50"></div>}
        </>
      ))}
    </div>
  );
}
