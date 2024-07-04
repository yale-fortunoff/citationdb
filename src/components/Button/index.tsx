export default function Button(props: any) {
  return (
    <button onClick={props.onClick} className="Button">
      {props.children}
    </button>
  );
}
