export default function getResourceLink(resource) {
    /*
     * example: https://fortunoff.aviaryplatform.com/c/mssa.hvt.0007/2/460
     */

     // Drop the "HVT-" part
     const num = String(resource.id.slice(4)).padStart(4, '0');

     return `https://fortunoff.aviaryplatform.com/c/mssa.hvt.${num}`
}