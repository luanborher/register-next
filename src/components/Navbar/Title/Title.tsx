interface TitleProps {
  text: string;
  margin?: boolean;
}

const Title = ({ text, margin }: TitleProps) => {
  return (
    <div className={`flex flex-col w-full ${margin ? 'mt-8' : 'mt-5'}`}>
      <div className="flex w-full px-4">
        <span className="text-white text-xxs md:text-xs xl:text-sm xxl:text-base font-medium">
          {text}
        </span>
      </div>
    </div>
  );
};

export default Title;
