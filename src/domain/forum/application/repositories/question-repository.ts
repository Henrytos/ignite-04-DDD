import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "../../enterprise/entities/question";

export interface QuestionsRepository {
    findBySlug(slug: string): Promise<Question | null>
    findById(id: string): Promise<Question | null>
    create(question: Question): Promise<void>
    delete(question: Question): Promise<void>
    save(question: Question): Promise<void>
    findManyRecent({ page }: PaginationParams): Promise<Question[]>
}