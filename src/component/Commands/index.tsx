import { format } from "date-fns"
import { Command } from "../../domain/Command"

type CommandsComponentProps = {
    pastCommands: Command[],
}

export const CommandsComponent = ({ pastCommands }: CommandsComponentProps) => 
    <div>
        <p>Past commands</p>
        <ul>
            {pastCommands.map(({ id, ts, basket, totalPrice }) => (
                <li key={id}>
                    <div>
                        <p>Id: { id }</p>
                        <p>Ts: {format(new Date(ts), 'dd MMM yyyy HH:mm')}</p>
                        <p>Price: { totalPrice }</p>
                        <ul>
                            {Object.entries(basket).map((([product, quantity]) => (
                                <li key={id}>
                                    <div>
                                        <p>Id: { product }</p>
                                        {/* <p>Commanded product name: { name }</p> */}
                                        <p>Quantity: { quantity }</p>
                                        {/* <p>Commanded product price: { price }</p> */}
                                        {/* <p>Commanded product total price: { price * quantity }</p> */}
                                    </div>
                                </li>
                            )))}
                        </ul>
                    </div>
                </li>
            ))}
        </ul>
    </div>