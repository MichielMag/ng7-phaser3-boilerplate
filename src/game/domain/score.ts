export class Score
{
    Stars : number = 0;

    add(score : Score)
    {
        this.Stars += score.Stars;
    }
}