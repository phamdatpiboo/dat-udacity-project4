import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic
const s3bucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiration = process.env.SIGNED_URL_EXPIRATION

export class AttachmentUtils{
    constructor(
        private readonly s3 = new XAWS.S3({ signatureVersion: 'v1'}),
        private readonly bucketName = s3bucketName,
    ) {}
    // get attcment
    getAttachmentUrl(todoId: string) {
        return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
    }
    // get upload url
    getUploadUrl(todoId: string): string {
        const upload_url =  this.s3.getSignedUrl('putObject', {
            Bucket: this.bucketName,
            Keu: todoId,
            Expires: urlExpiration
            
        })
        
        return upload_url as string
    }

}