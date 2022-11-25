output = {}
inp = {"first_name":"daksh", "last_name":"verma", "address":"address"}
import string
import random
import sys
import json

mapping_ = json.loads(sys.argv[1])
 
N = 7

def add(*args):
    sum_ = 0
    for a in args:
        sum_+=a
    return sum_

def concat(*args):
    result = ""
    for a in args:
        result = result+a
    return result 

def equal_to(arg1, arg2):
    return arg1==arg2

def not_equal_to(arg1, arg2):
    return arg1!=arg2

def greater_than(arg1, arg2):
    return arg1>arg2

def smaller_than(arg1, arg2):
    return arg1<arg2 

def greater_than_or_equal(arg1, arg2):
    return arg1>=arg2

def smaller_than_or_equal(arg1, arg2):
    return arg1<=arg2 

def _if(cond, arg1, arg2):
    if cond:
        return arg1
    else:
        return arg2

def convert_to_python_dict_access(s, dict_name = 'inp'):
    s = s[1:]
    path = s.split('.')
    result = dict_name
    for p in path:
        result+="['"+p+"']"
    return result


def get_args(v):
    start_ind = v.find('(')
    count = 1
    seperator_indices = []
    seperator_indices.append(start_ind)
    args = []
    for i in range(start_ind+1, len(v)):
        if v[i]=='(':
            count+=1
        elif v[i]==')':
            count-=1
        elif v[i]==',':
            if count==1:
                seperator_indices.append(i)
    
    for i in range(len(seperator_indices)):
        if i==len(seperator_indices)-1:
            arg = v[seperator_indices[i]+1:-1]
            args.append(arg)
        else:
            arg = v[seperator_indices[i]+1: seperator_indices[i+1]]
            args.append(arg)


    return args
    

def parse_string(v, input_dict_name = 'inp'):
    result = ""
    v = v.replace(' ', '')
    if(len(v)==0):
        result = ""
    elif(v=='\sp'):
        result = "' '"
    elif(v[0]=='_'):
        func = v[0:v.find('(')].lower()
        result = func+'('
        
        args = get_args(v)
        for i in range(len(args)):
            a = args[i]
            result+=parse_string(a, input_dict_name)
            if i!=len(args)-1:
                result+=","
        
        result+=')'

    elif(v[0]=='$'):
        result = convert_to_python_dict_access(v, input_dict_name)
    else:
        result = v
    
    return result

def gen_random_string():
    res = ''.join(random.choices(string.ascii_uppercase +
                             string.digits, k=N))
    return res

def addtabs(no):
    a =''
    for i in range(no):
        a+='\t'
    return a

def parse(mapping, dict_name, outer, input_dict_name, tabs):
    for k, v in mapping.items():
        if type(v) is str:
            result = parse_string(v, input_dict_name)
            print(addtabs(tabs)+dict_name+"['"+k+"']="+result)
                
        elif type(v) is dict:
            new_dict_name = gen_random_string()
            print(addtabs(tabs)+new_dict_name+"={}")
            parse(v, new_dict_name, False, input_dict_name, tabs)
            print(addtabs(tabs)+dict_name+"['"+k+"']="+new_dict_name)
        elif type(v) is list:
            array = []
            v = v[0]
            data = v['data']
            mapped_from = v['mapped_from']
            filt = None
            if 'filter' in v.keys():
                filt = v['filter']
            random_item_name = gen_random_string()
            arr_name = gen_random_string()
            print(addtabs(tabs)+arr_name+"=[]")
            print(addtabs(tabs)+"for "+random_item_name+" in "+input_dict_name+"['"+mapped_from+"']:")
            count = 1
            if filt is not None:
                print(addtabs(tabs+1)+"if "+parse_string(filt, random_item_name)+":")
                count = 2
            random_item_output_name = gen_random_string()
            print(addtabs(tabs+count)+random_item_output_name+"={}")
            parse(data, random_item_output_name, False, random_item_name, tabs+count)
            print(addtabs(tabs+count)+arr_name+".append("+random_item_output_name+")")
            print(addtabs(tabs)+dict_name+"['"+k+"']="+arr_name)
        
        else:
            print("invalid structure")


parse(mapping_, 'output', True, 'inp', 0)
