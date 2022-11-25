

import json
import sys
def _add(*args):
    sum_ = 0
    for a in args:
        sum_+=a
    return sum_

def _concat(*args):
    result = ""
    for a in args:
        result = result+a
    return result 

def _equal_to(arg1, arg2):
    return arg1==arg2

def _not_equal_to(arg1, arg2):
    return arg1!=arg2

def _greater_than(arg1, arg2):
    return arg1>arg2

def _smaller_than(arg1, arg2):
    return arg1<arg2 

def _greater_than_or_equal(arg1, arg2):
    return arg1>=arg2

def _smaller_than_or_equal(arg1, arg2):
    return arg1<=arg2 

def _if(cond, arg1, arg2):
    if cond:
        return arg1
    else:
        return arg2

def _and(arg1, arg2):
    return arg1 and arg2

def _or(arg1, arg2):
    return arg1 or arg2

def _enum(arg1, *args):
    for a in args:
        k, v = tuple(a.split(':'))
        if arg1==k:
            return v
    return ""

output = {}
inp = sys.argv[1]
inp = json.loads(inp)

    
output['test']='mapping'
print(output)
