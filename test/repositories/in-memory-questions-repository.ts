import { PaginationParams } from "@/core/repositories/pagination-params";
import { QuestionsRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionsRepository {
    items: Question[] = [];

    async create(question: Question) {
        this.items.push(question)
    }

    async findBySlug(slug: string) {
        const question = this.items.find(item => item.slug.value === slug);
        if (!question) {
            return null
        }

        return question
    }

    async delete(question: Question) {
        this.items = this.items.filter(item => item.id.toString() !== question.id.toString())
    }

    async findById(questionId: string) {
        const question = this.items.find(item => item.id.toString() === questionId);
        if (!question) {
            return null
        }

        return question
    }

    async findManyRecent({ page }: PaginationParams) {
        const questions = this.items
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
            .slice((page - 1) * 20, page * 20)

        return questions
    }

    async save(question: Question) {
        const itemIndex = this.items.findIndex(item => item.id.toString() === question.id.toString())
        this.items[itemIndex] = question
    }
}