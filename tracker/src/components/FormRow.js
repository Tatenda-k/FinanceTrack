const FormRow = ({type, name, value, handleChange, labelText}) =>{
    return(
        <div className = 'flex flex-col '>
            <label htmlFor = {name} className='py-2'>
                {labelText || name}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
            />

        </div>
    )
}
;
export default FormRow