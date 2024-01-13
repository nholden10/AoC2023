const fs = require('fs')

class Part {
  constructor(x, m, a, s) {
    this.x = x
    this.m = m
    this.a = a
    this.s = s
  }
}

const filename = 'day19input.txt'
const data = fs.readFileSync(filename, 'utf8')

const lines = data.split(/\n/)
const [workflows, parts] = sortLines(lines)

let totalSum = 0

Part: for (let part in parts) {
  const accepted = sortPart(parts[part])
  if (accepted) {
    console.log(`Part: ${part} was accepted `)
    let partSum =
      parseInt(parts[part].x) +
      parseInt(parts[part].m) +
      parseInt(parts[part].a) +
      parseInt(parts[part].s)
    console.log(`Added ${partSum} to ${totalSum} `)
    totalSum = totalSum + partSum
    console.log(`Total sum is now ${totalSum}`)
  } else {
    console.log(`Part: ${part} was rejected.\nTotal sum is ${totalSum}`)
  }
  console.log(`----------------------------------------------------`)
}

function sortPart(part) {
  // Each part starts at the 'in' workflow
  let workflowName = 'in'
  while (workflowName != 'R' && workflowName != 'A') {
    //
    const flow = extractFlows(workflows.get(workflowName))

    Condition: for (let cond in flow) {
      let char
      let nextFlow
      let sign
      let testValue

      console.log(
        `condition: ${flow[cond].condition}\nnext dest: ${flow[cond].next}`
      )

      if (
        flow[cond].condition.includes('<') ||
        flow[cond].condition.includes('>')
      ) {
        char = flow[cond].condition[0]
        sign = flow[cond].condition[1]
        testValue = parseInt(flow[cond].condition.slice(2))
        nextFlow = flow[cond].next
      } else {
        workflowName = flow[cond].next
        console.log(
          `No conditions met, moving to default flow: ${workflowName}`
        )
        break Condition
      }

      if (sign == '>') {
        if (part[char] > testValue) {
          workflowName = nextFlow
          console.log(`Condition was met.`)
          break Condition
        } else {
          console.log(`Condition NOT met, checking next condition...`)
          continue Condition
        }
      } else if (sign == '<') {
        console.log(`part[char]: ${part[char]}, test value: ${testValue}`)
        if (part[char] < testValue) {
          workflowName = nextFlow
          console.log(
            `Condition was met. Moving to next workflow of ${nextFlow}`
          )
          break Condition
        } else {
          console.log(
            `Condition NOT met, as ${part[char]} exceeded the condition limit of ${testValue}\nChecking next condition...`
          )
          continue Condition
        }
      }
      console.log(`nextFlow: ${workflowName}`)
    }
  }
  return workflowName == 'R' ? false : true
}

function extractFlows(workflow) {
  const flows = []
  const data = workflow.split(',')
  let flow
  let dest
  for (let sec in data) {
    if (data[sec].includes(':')) {
      ;[flow, dest] = data[sec].split(':')
    } else {
      flow = 'other'
      dest = data[sec].slice(0, data[sec].length - 1)
    }
    flows.push({
      condition: flow,
      next: dest,
    })
  }
  return flows
}

function sortLines(lines) {
  const workflows = new Map()
  const parts = []
  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i]
    if (currentLine.charAt(0) == '{') {
      parts.push(buildPart(currentLine))
    } else if (currentLine.charAt(0) == '') {
      continue
    } else {
      const [name, workflow] = buildWorkflow(currentLine)
      workflows.set(name, workflow)
    }
  }
  return [workflows, parts]
}

function buildPart(line) {
  let x, m, a, s
  x = parseInt(line.split(/=|,|{|}/)[2])
  m = parseInt(line.split(/=|,|{|}/)[4])
  a = parseInt(line.split(/=|,|{|}/)[6])
  s = parseInt(line.split(/=|,|{|}/)[8])
  const part = new Part(x, m, a, s)
  return part
}

function buildWorkflow(line) {
  return [line.split('{')[0], line.split('{')[1]]
}
