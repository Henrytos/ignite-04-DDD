import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswersRepository implements AnswersRepository {
    public items: Answer[] = [];
    async create(answer: Answer) {
        this.items.push(answer)
    }

    async delete(answer: Answer) {
        this.items = this.items.filter(item => item.id.toString() !== answer.id.toString())
    }

    async findById(answerId: string) {
        const answer = this.items.find(item => item.id.toString() === answerId);

        if (!answer) {
            return null
        }

        return answer
    }
    async save(answer: Answer) {
        const itemIndex = this.items.findIndex(item => item.id.toString() === answer.id.toString())
        this.items[itemIndex] = answer
    }
}