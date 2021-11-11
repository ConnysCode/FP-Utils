const Person = (props: { name: string, hours: number }) => {
        return <div className={`Person`}><h3>{props.name}</h3><p>{props.hours}h</p></div>
}

export default Person;