interface InputTextProps {
    className?: string;
    id?: string;
    name: string;
    type?: 'text' | "number";
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void; // Agrega el tipo de evento y el tipo de retorno
  
  }
  
  const InputText = ({ id, className = '', type, name, value, onChange}: InputTextProps) => {
    return (
      <input
        id={id}
        className={`border block w-full border-gray-400 rounded focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
        type={type}
        name={name}
        value={value} // Asigna el valor al input
        onChange={onChange} // Asigna la función onChange al input
        
      />
    );
  }
  
  export default InputText;