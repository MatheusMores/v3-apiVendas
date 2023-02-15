import handlebars from "handlebars";
import fs from 'fs'

interface ITemplateVariable {
    [key: string]: string | number;
}

export interface IParseMailTemplate {
    filePath: string;
    variables: ITemplateVariable;
}

class HandlebarsMailTemplate{
    public async parse({filePath, variables}: IParseMailTemplate): Promise<string>{
        const templateFileContent = await fs.readFileSync(filePath, {encoding:'utf-8'});
        const parseTemplate = handlebars.compile(templateFileContent);

        return parseTemplate(variables);
    }
}

export default HandlebarsMailTemplate;