import { randomUUID } from "crypto"
import { Entity } from "../core/entities/entity"

interface InstructorProps {
    name: string
}

export class Instructor extends Entity<InstructorProps> {


    constructor(props: InstructorProps, id?: string) {
        super(props, id)
    }
}