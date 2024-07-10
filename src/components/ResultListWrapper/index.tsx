export default function ResultListWrapper(props: {
  children: React.ReactNode;
}) {
  return (
    <section className="relative mx-auto w-4/5 max-w-[1200px]">
      {props.children}
    </section>
  );
}
