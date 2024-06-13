import { randomUUID } from "node:crypto"
import { Entity } from "../core/entities/entity"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
    authorId: string
    bestAnswerId?: string
    slug: Slug
    title: string
    content: string
    createdAt: Date
    updatedAt?: Date

}

export class Question extends Entity<QuestionProps> {

}