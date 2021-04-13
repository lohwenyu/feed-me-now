<template>
    <div>
        <v-app>
        <NavigationBar2/>
        <v-container>
            <v-row :justify="center">
                <v-col cols="12">
                    <v-card height="100%" flat>
                        <v-card-title> Leave your feedback here </v-card-title>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-textarea v-model.trim="feedback" :counter="200" :rules="feedbackRules" label="Feedback" required no-resize outlined>
                            </v-textarea>
                        </v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="validate()" color="#40A8D4"> Submit Feedback 
                                <v-icon right> arrow_right </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-container>
            <v-row :justify="center">
                <v-col cols="12">
                    <v-card height="100%" flat>
                        <v-card-title> Transaction Enquiry </v-card-title>
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-text-field> Transaction Number </v-text-field>
                            <v-textarea v-model.trim="feedback" :counter="200" :rules="feedbackRules" label="Feedback" required no-resize outlined>
                            </v-textarea>
                        </v-form>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn @click="validate()" color="#40A8D4"> Submit Feedback 
                                <v-icon right> arrow_right </v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
        </v-app>
    </div>
</template>

<script>
import NavigationBar2 from './NavigationBar2.vue'
export default {
    components : {
        NavigationBar2 
    } , 
    data() {
        return {
            valid : "true" , 
            feedback : "",
            feedbackRules : [
                v => !!v || "Feedback cannot be empty" ,
                v => (v && v.length <= 200) || "Feedback must be less than 200 characters"
            ] ,
            transactionNumber : "" , 
            transactionEnquiry : "" , 
            transactionNumberRules : [
                
            ]

        }
    } , 
    methods : {
        validate : function(){
            this.$refs.form.validate()
        }
    }
}
</script>

<style scoped>
    .v-application {
        background-color: #e4ebdd;
    }
</style>