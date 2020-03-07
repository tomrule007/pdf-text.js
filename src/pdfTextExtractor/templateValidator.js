export default function isValidTemplate(templateString) {
  try {
    const templateObject = JSON.parse(templateString);
    if (!templateObject) throw new Error(`invalid template: ${templateString}`);
    Object.entries(templateObject).forEach(([key, value]) => {});
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
